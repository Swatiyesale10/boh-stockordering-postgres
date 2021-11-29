export class StatusModel {
    constructor(
        public id: number,
        public name:string,
        public short_desc:string,

          ) {
        console.log('status model created')
    }
}
/*export enum status{
  ACCEPTED="ACCEPTED",
  CANCEL="CANCEL",
  SAVE="SAVE"
}*/