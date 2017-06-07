/**
 * Created by Vika on 07.06.2017.
 */
//https://stackoverflow.com/questions/35985009/angular-2-what-is-equivalent-to-root-scope
/*

export class SharedService {
    data: any;
    dataChange: Observable<any>;

    constructor() {
        this.dataChange = new Observable((observer:Observer) {
            this.dataChangeObserver = observer;
        });
    }

    setData(data:any) {
        this.data = data;
        this.dataChangeObserver.next(this.data);
    }
}
*/