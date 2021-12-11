export default class Purchase {
    constructor(userId, courseId, title, price, purchaseTime, id) {
        this.userId = userId;
        this.courseId = courseId;
        this.title = title;
        this.price = price;
        this.purchaseTime = purchaseTime;
        this.id = id;
    }
}
