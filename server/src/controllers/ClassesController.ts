import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ClassSchedule {
    week_day: number,
    from: string,
    to: string,
};

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        if (!filters.week_day || !filters.subject || !filters.time)
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });

        const time = filters.time as string;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*').from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    };

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const transaction = await db.transaction();

        try {

            const insertedUsers = await transaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            const insertedClasses = await transaction('classes').insert({
                user_id: insertedUsers[0],
                subject,
                cost
            });

            const classesSchedules = schedule.map((classSchedule: ClassSchedule) => {
                return {
                    class_id: insertedClasses[0],
                    week_day: classSchedule.week_day,
                    from: convertHourToMinutes(classSchedule.from),
                    to: convertHourToMinutes(classSchedule.to)
                }
            });

            await transaction('class_schedule').insert(classesSchedules);

            transaction.commit();

            return response.status(201).send();

        } catch (error) {

            transaction.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    };
}