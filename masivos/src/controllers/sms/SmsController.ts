import { Request, Response } from "express";
import { Leads } from "../../models/Leads";
import RabbitMQService from "../../services/RabbitMQService";
import { Sms } from "../../models/Sms";
import { Op } from "sequelize";
import { Flows } from "../../models/Flows";
import { SmsLead } from "../../models/SmsLeads";

export class SmsController{
    async send(req: Request, res: Response){
        try {
            const { name, amountsend, flow, numeros } = req.body.sms;
            await Leads.bulkCreate(
                numeros.map((numero: string) => ({
                    number: numero,
                    status: true,
                    metodo: "SMS"
                })),
                { ignoreDuplicates: true }
            );
            const leads = await Leads.findAll({
                where: { number: numeros },
              });
            const rabbitMQ = await RabbitMQService.getInstance();
            const queue = "sms";

            const texto = flow.mensajes
            .filter((mensaje: any) => mensaje.tipo === 'texto')
            .map((mensaje: any) => mensaje.content.body).join("\n");
            const newsms = await Sms.create({
                name: name,
                amountsend: amountsend,
                flowId: flow.id,
            })


            const smsLeadsData = leads.map(lead => ({
                smsId: newsms.id,
                leadId: lead.id,
                status: "ENVIADO"
            }));
            
            await Promise.all(
                leads.map(lead => 
                    rabbitMQ.sendMessage(queue, JSON.stringify({ number: lead.number, texto }))
                )
            );
            await SmsLead.bulkCreate(smsLeadsData);
            res.status(200).json({ message: "se registraron correctamente los queues" });
        } catch (error: any) {
            res.status(200).json({message: "error", error: error.message})
        }
    }
    async search(req: Request, res: Response){
        try {
            const { search, page = 1, limit = 10 } = req.body;
            const offset = (page - 1) * limit;
            const total = await Sms.count({
                where: {
                    name:{
                        [Op.like]: `%${search}%`
                    }
                },
            });
            const sms = await Sms.findAll({
                        where: {
                            name: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        include: [
                            { model: Flows, attributes: ["name"] }
                        ],
                        order: [['createdAt', 'DESC']],
                        limit, 
                        offset
                    });
            const format = sms.map(sms => ({
                id: sms.id,
                name: sms.name,
                amountsend: sms.amountsend,
                flow: sms.flow?.name || "SIN FLUJO",
                createdAt: sms.createdAt
            }));

            res.status(200).json({ 
                sms: format, 
                total, 
                page,
                pages: Math.ceil(total / limit) });
        } catch (error: any) {
            res.status(500).json({ message: "error en la busqueda del cliente", error: error.message });
        }
    
    }
}