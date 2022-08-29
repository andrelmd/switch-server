import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn({ name: 'id', type: 'varchar', default: () => 'UUID()' })
    id: string

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name: 'password', type: 'varchar' })
    password: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP()' })
    updatedAt: Date
}
