import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({
    name: 'status_master'
})
export class StatusMaster {
    constructor() {
        console.log('StatusMaster entity created')
    }
    @PrimaryGeneratedColumn()
    id:number;
        
        
    
    

    @Column({
        name: 'name',
       // type: 'character varying',
    })
    name: string;

    @Column({
        name: 'short_desc',
       // type: 'character varying',
    })
    short_desc: string;

   
}