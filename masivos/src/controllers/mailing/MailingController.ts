import { Leads } from "../../models/Leads";
import { Mailing } from "../../models/Mailing";
import { MailingLead } from "../../models/MailingLead";
import RabbitMQService from "../../services/RabbitMQService";

class MailingController {

    RegisterMailingExcel = async (req: any, res: any) => {
        try {
            const {mailing, dataExcel} = req.body
            console.log("mailing", mailing);
            
            if(dataExcel.length == 0) return res.status(400).json({error:"No puedes enviar un mensaje sin email de destino"})

            for(const data of dataExcel){
                if (!data.number && !data.email) return res.status(400).json({ error: "Cada lead debe tener al menos un número o un email" });
                
                await Leads.findOrCreate({
                    where: { number: data.number },
                    defaults: { number: data.number || null, email: data.email || null, status: true, metodo: "EMAIL"},
                });
            }

            const leadsEmail = dataExcel.map((d: { email: string; number: string }) => d.email)
            console.log("leadsEmail", leadsEmail);
            

            const leads = await Leads.findAll({
                where: { email: leadsEmail },
            });
            
            console.log("SI LLEGUA AQUI");
            
            const rabbitMQ = await RabbitMQService.getInstance();
            const nuevoMailing = await Mailing.create({
                name: mailing.name,
                templateName: mailing.templateName,
                templateId: mailing.templateId,
                amountsend: mailing.cant,
            });

            const queue = "emailQueue";

            const mailingLeadsData =leads.map(lead => ({
                mailingId: nuevoMailing.id,
                leadId: lead.id,
                status: "ENVIADO",
            }))
//acsdsad
            await Promise.all(
                leads.map(lead =>
                    rabbitMQ.sendMessage(queue, JSON.stringify({email: lead.email, template: mailing.templateName}))
                )
            )
            await MailingLead.bulkCreate(mailingLeadsData)

            return res.status(200).json({ message: "Se registro correctamente en la queue" });
        } catch (error) {
            console.log("Error al procesar los emails:", error);
            return res.status(500).json({ messge:"Error al procesar la solicitud" ,error: error });
        }
    }

    RegisterMailing = async (req: any, res: any) => {
        try {
            const { mailing } = req.body;

            const leads = await Leads.findAll({
                where: { status: false },
                limit: mailing.cant,
            });

            if (!leads || leads.length === 0) {
                return res
                  .status(404)
                  .json({ error: "No se encontraron leads para enviar masivos" });
            }

            const rabbitMQ = await RabbitMQService.getInstance();

            const nuevoMailing = await Mailing.create({
                name: mailing.name,
                templateName: mailing.templateName,
                templateId: mailing.templateId,
                amountsend: mailing.cant,
            });

            for (const lead of leads) {
                const queue = "emailQueue";

                const message = {email: lead.email, template: mailing.templateName}

                await rabbitMQ.sendMessage(queue, JSON.stringify(message))
                await Leads.update({
                    status: true,
                    metodo: "EMAIL",
                }, { where: { 
                    number: lead.number 
                } });

                await MailingLead.create({
                    mailingId: nuevoMailing.id,
                    leadId: lead.id,
                    status: "ENVIADO",
                })

                

            }



            return res.status(200).json({ message: "Se registro correctamente en la queue" });
        } catch (error) {
            console.log("Error al procesar los emails:", error);
            return res.status(500).json({ messge:"Error al procesar la solicitud" ,error: error });
        }
    }

}

export default MailingController;