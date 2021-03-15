import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
    statusCode=404;
    reason="Page Not Found";
    constructor(){
        super("Route Not Found");

        Object.setPrototypeOf(this,NotFoundError.prototype);
    }

    serializeErrors(){
        return [{message:this.reason}];
    }
}
