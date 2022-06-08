import { HttpError } from 'routing-controllers';

export class BusinessNotFoundError extends HttpError {
    constructor() {
        super(404, 'Business not found!');
    }
}
