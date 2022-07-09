export class TableConfig{
    tableColumn:TableColumn[]
    actionColumn:ActionColumn[]
}

export class TableColumn{
    label:string;
    data:string;
    pipeType?:string;
}

export class ActionColumn{
    label:string;
    action:string;
}