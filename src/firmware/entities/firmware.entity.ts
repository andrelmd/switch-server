import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('firmware')
export class Firmware {
    @PrimaryColumn({ name: 'id', type: 'varchar', default: () => 'UUID()' })
    id: string

    @Column({ name: 'version', type: 'string' })
    version: string

    @Column({ name: 'switch_model', type: 'int4' })
    switchModelId: number

    @Column({ name: 'binary', type: 'blob' })
    binary: Buffer

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP()' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP()' })
    updatedAt: Date
}
