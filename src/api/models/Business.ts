import { IsNotEmpty } from 'class-validator';
import {
    Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
export class Business {
    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public isActive: boolean;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date;

    // @IsNotEmpty()
    // @Column()
    // public age: number;

    // @Column({
    //     name: 'user_id',
    //     nullable: true,
    // })
    // public userId: string;

    // @ManyToOne((type) => User, (user) => user.pets)
    // @JoinColumn({ name: 'user_id' })
    // public user: User;

    // public toString(): string {
    //     return `${this.name}`;
    // }
}
