export class Message {
    
    constructor(public text: String,
        public error: boolean = false,
        public responses?: [string, (r: string ) => void][]
    ){ }
}