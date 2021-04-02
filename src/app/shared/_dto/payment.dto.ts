import DateTimeFormat = Intl.DateTimeFormat;

export class PaymentDto {
    persona: string;
    date: string;
    email: string;
    message: string;
    amount: number;
    method: string;
    enrollmentId: number;
    coupon: string;

    constructor(
        persona?: string,
        date?: string,
        email?: string,
        message?: string,
        amount?: number,
        method?: string,
        enrollmentId?: number,
        coupon?: string
    ) {
        this.persona = persona || '';
        this.date = date || new Date().toISOString().substr(0, 16);
        this.email = email || '';
        this.message = message || '';
        this.amount = amount || 0;
        this.method = method || '';
        this.enrollmentId = enrollmentId || 0;
        this.coupon = coupon || '';
    }
}
