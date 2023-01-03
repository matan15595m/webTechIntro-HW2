class Req{
    body = {};
    userId = null;
    constructor(body, userId, params = null, query = null) {
        this.body = body
        this.userId = userId
    }
    //cons
    static fromRestRequest(req) {
        return new Req(req.body, req.user._id);
    }
}
export = Req;