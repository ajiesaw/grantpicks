import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CB56YJY26HSUIQGDGRDFHMWTTFZBMHSVEUPDHKUQH7PQPOSJO7WYYJQO",
    }
};
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["New"] = 0] = "New";
    ProjectStatus[ProjectStatus["Approved"] = 1] = "Approved";
    ProjectStatus[ProjectStatus["Rejected"] = 2] = "Rejected";
    ProjectStatus[ProjectStatus["Completed"] = 3] = "Completed";
})(ProjectStatus || (ProjectStatus = {}));
export const Errors = {
    1: { message: "EmptyName" },
    2: { message: "EmptyOverview" },
    3: { message: "EmptyContacts" },
    4: { message: "EmptyAdmins" },
    5: { message: "EmptyImageUrl" },
    6: { message: "AdminOrOwnerOnly" },
    7: { message: "OwnerOnly" },
    8: { message: "ContractOwnerOnly" },
    9: { message: "AlreadyApplied" },
    10: { message: "DataNotFound" },
    11: { message: "AlreadyInitialized" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["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",
            "AAAAAQAAAAAAAAAAAAAADVJvdW5kUHJlQ2hlY2sAAAAAAAADAAAAAAAAAAlhcHBsaWNhbnQAAAAAAAATAAAAAAAAAAloYXNfdmlkZW8AAAAAAAABAAAAAAAAAApwcm9qZWN0X2lkAAAAAAAK",
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACwAAAAAAAAAJRW1wdHlOYW1lAAAAAAAAAQAAAAAAAAANRW1wdHlPdmVydmlldwAAAAAAAAIAAAAAAAAADUVtcHR5Q29udGFjdHMAAAAAAAADAAAAAAAAAAtFbXB0eUFkbWlucwAAAAAEAAAAAAAAAA1FbXB0eUltYWdlVXJsAAAAAAAABQAAAAAAAAAQQWRtaW5Pck93bmVyT25seQAAAAYAAAAAAAAACU93bmVyT25seQAAAAAAAAcAAAAAAAAAEUNvbnRyYWN0T3duZXJPbmx5AAAAAAAACAAAAAAAAAAOQWxyZWFkeUFwcGxpZWQAAAAAAAkAAAAAAAAADERhdGFOb3RGb3VuZAAAAAoAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAACw==",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAOY29udHJhY3Rfb3duZXIAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAFYXBwbHkAAAAAAAACAAAAAAAAAAlhcHBsaWNhbnQAAAAAAAATAAAAAAAAAA5wcm9qZWN0X3BhcmFtcwAAAAAH0AAAABNDcmVhdGVQcm9qZWN0UGFyYW1zAAAAAAEAAAfQAAAAB1Byb2plY3QA",
            "AAAAAAAAAAAAAAAVY2hhbmdlX3Byb2plY3Rfc3RhdHVzAAAAAAAAAwAAAAAAAAAOY29udHJhY3Rfb3duZXIAAAAAABMAAAAAAAAACnByb2plY3RfaWQAAAAAAAoAAAAAAAAACm5ld19zdGF0dXMAAAAAB9AAAAANUHJvamVjdFN0YXR1cwAAAAAAAAA=",
            "AAAAAAAAAAAAAAAOdXBkYXRlX3Byb2plY3QAAAAAAAMAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAKcHJvamVjdF9pZAAAAAAACgAAAAAAAAASbmV3X3Byb2plY3RfcGFyYW1zAAAAAAfQAAAAE1VwZGF0ZVByb2plY3RQYXJhbXMAAAAAAA==",
            "AAAAAAAAAAAAAAAJYWRkX2FkbWluAAAAAAAAAgAAAAAAAAAKcHJvamVjdF9pZAAAAAAACgAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAMcmVtb3ZlX2FkbWluAAAAAgAAAAAAAAAKcHJvamVjdF9pZAAAAAAACgAAAAAAAAAPYWRtaW5fdG9fcmVtb3ZlAAAAABMAAAAA",
            "AAAAAAAAAAAAAAARZ2V0X3Byb2plY3RfYnlfaWQAAAAAAAABAAAAAAAAAApwcm9qZWN0X2lkAAAAAAAKAAAAAQAAB9AAAAAHUHJvamVjdAA=",
            "AAAAAAAAAAAAAAAMZ2V0X3Byb2plY3RzAAAAAgAAAAAAAAAEc2tpcAAAA+gAAAAGAAAAAAAAAAVsaW1pdAAAAAAAA+gAAAAGAAAAAQAAA+oAAAfQAAAAB1Byb2plY3QA",
            "AAAAAAAAAAAAAAASZ2V0X3Byb2plY3RfYWRtaW5zAAAAAAABAAAAAAAAAApwcm9qZWN0X2lkAAAAAAAKAAAAAQAAA+oAAAAT",
            "AAAAAAAAAAAAAAASZ2V0X3RvdGFsX3Byb2plY3RzAAAAAAAAAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAHdXBncmFkZQAAAAABAAAAAAAAAA1uZXdfd2FzbV9oYXNoAAAAAAAD7gAAACAAAAAA",
            "AAAAAAAAAAAAAAAaZ2V0X3Byb2plY3RfZnJvbV9hcHBsaWNhbnQAAAAAAAEAAAAAAAAACWFwcGxpY2FudAAAAAAAABMAAAABAAAH0AAAAAdQcm9qZWN0AA==",
            "AAAAAAAAAAAAAAAFb3duZXIAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAMZ2V0X3ByZWNoZWNrAAAAAQAAAAAAAAAJYXBwbGljYW50AAAAAAAAEwAAAAEAAAPoAAAH0AAAAA1Sb3VuZFByZUNoZWNrAAAA",
            "AAAAAAAAAAAAAAASZ2V0X3ByZWNoZWNrX2J5X2lkAAAAAAABAAAAAAAAAApwcm9qZWN0X2lkAAAAAAAKAAAAAQAAA+gAAAfQAAAADVJvdW5kUHJlQ2hlY2sAAAA=",
            "AAAAAgAAAAAAAAAAAAAAC0NvbnRyYWN0S2V5AAAAAAUAAAAAAAAAAAAAAA1OdW1PZlByb2plY3RzAAAAAAAAAAAAAAAAAAAIUHJvamVjdHMAAAABAAAAAAAAAAdQcm9qZWN0AAAAAAEAAAAKAAAAAAAAAAAAAAANUmVnaXN0cnlBZG1pbgAAAAAAAAAAAAAAAAAAFEFwcGxpY2FudFRvUHJvamVjdElE"]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        apply: (this.txFromJSON),
        change_project_status: (this.txFromJSON),
        update_project: (this.txFromJSON),
        add_admin: (this.txFromJSON),
        remove_admin: (this.txFromJSON),
        get_project_by_id: (this.txFromJSON),
        get_projects: (this.txFromJSON),
        get_project_admins: (this.txFromJSON),
        get_total_projects: (this.txFromJSON),
        upgrade: (this.txFromJSON),
        get_project_from_applicant: (this.txFromJSON),
        owner: (this.txFromJSON),
        get_precheck: (this.txFromJSON),
        get_precheck_by_id: (this.txFromJSON)
    };
}
