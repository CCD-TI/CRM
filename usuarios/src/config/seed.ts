
import { Roles } from "../models/Roles";


export const seedData = async () =>{
    
    const [countRoles] = await Promise.all([
        Roles.count()
    ]);

    if ([countRoles].some(count => count > 0)) {
        return { message: "Data insertada previamente" };
    }

    await Promise.all([

        Roles.bulkCreate([
            {name:"SuperAdmin"},
            {name:"AdminComercial"},
            {name:"AdminAcademico"},
            {name:"AdminSoporte"},
            {name:"AdminMarketing"},
            {name:"UsuarioComercial"},
            {name:"UsuarioAcademico"},
            {name:"UsuarioSoporte"},
            {name:"UsuarioMarketing"}
        ]),
    
       
    ])
    
    return {message: "Seeding completed successfully"}

}