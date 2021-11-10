export interface IAccount {
    adminId: String;
    adminType: String;
    status: Boolean;
    fullName: {
        firstName: String;
        middleName: String;
        lastName: String;
        nameExtension : String;
    };
    address: String;
    contact: {
        email: String;
    };
    username: String;
}