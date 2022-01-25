export interface IAccount {
    _id: string;
    adminId: String;
    adminType: String;
    status: Boolean;
    fullName: {
        firstName: String;
        middleName: String;
        lastName: String;
        nameExtension : String;
    };
    contact: {
        email: String;
    };
    username: String;
    permissions: Array<String>;
}