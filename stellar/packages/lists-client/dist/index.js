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
        contractId: "CD5XBFIY7FPGM44WPL6G3MKICI253CUQI3HLJ2FFAP5RF6LVPSP3H7P6",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["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",
            "AAAAAAAAAAAAAAALZGVsZXRlX2xpc3QAAAAAAgAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAdsaXN0X2lkAAAAAAoAAAAA",
            "AAAAAAAAAAAAAAAGdXB2b3RlAAAAAAACAAAAAAAAAAV2b3RlcgAAAAAAABMAAAAAAAAAB2xpc3RfaWQAAAAACgAAAAA=",
            "AAAAAAAAAAAAAAANcmVtb3ZlX3Vwdm90ZQAAAAAAAAIAAAAAAAAABXZvdGVyAAAAAAAAEwAAAAAAAAAHbGlzdF9pZAAAAAAKAAAAAA==",
            "AAAAAAAAAAAAAAASdHJhbnNmZXJfb3duZXJzaGlwAAAAAAADAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAAB2xpc3RfaWQAAAAACgAAAAAAAAAMbmV3X293bmVyX2lkAAAAEwAAAAEAAAAT",
            "AAAAAAAAAAAAAAAKYWRkX2FkbWlucwAAAAAAAwAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAdsaXN0X2lkAAAAAAoAAAAAAAAABmFkbWlucwAAAAAD6gAAABMAAAABAAAD6gAAABM=",
            "AAAAAAAAAAAAAAANcmVtb3ZlX2FkbWlucwAAAAAAAAMAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAHbGlzdF9pZAAAAAAKAAAAAAAAAAZhZG1pbnMAAAAAA+oAAAATAAAAAQAAA+oAAAAT",
            "AAAAAAAAAAAAAAAMY2xlYXJfYWRtaW5zAAAAAgAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAdsaXN0X2lkAAAAAAoAAAAA",
            "AAAAAAAAAAAAAAAOcmVnaXN0ZXJfYmF0Y2gAAAAAAAQAAAAAAAAACXN1Ym1pdHRlcgAAAAAAABMAAAAAAAAAB2xpc3RfaWQAAAAACgAAAAAAAAAFbm90ZXMAAAAAAAPoAAAAEAAAAAAAAAANcmVnaXN0cmF0aW9ucwAAAAAAA+gAAAPqAAAH0AAAABFSZWdpc3RyYXRpb25JbnB1dAAAAAAAAAEAAAPqAAAH0AAAABRSZWdpc3RyYXRpb25FeHRlcm5hbA==",
            "AAAAAAAAAAAAAAAKdW5yZWdpc3RlcgAAAAAAAwAAAAAAAAAJc3VibWl0dGVyAAAAAAAAEwAAAAAAAAAHbGlzdF9pZAAAAAPoAAAACgAAAAAAAAAPcmVnaXN0cmF0aW9uX2lkAAAAA+gAAAAKAAAAAA==",
            "AAAAAAAAAAAAAAATdXBkYXRlX3JlZ2lzdHJhdGlvbgAAAAAFAAAAAAAAAAlzdWJtaXR0ZXIAAAAAAAATAAAAAAAAAAdsaXN0X2lkAAAAAAoAAAAAAAAAD3JlZ2lzdHJhdGlvbl9pZAAAAAAKAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAASUmVnaXN0cmF0aW9uU3RhdHVzAAAAAAAAAAAABW5vdGVzAAAAAAAD6AAAABAAAAABAAAH0AAAABRSZWdpc3RyYXRpb25FeHRlcm5hbA==",
            "AAAAAAAAAAAAAAAIZ2V0X2xpc3QAAAABAAAAAAAAAAdsaXN0X2lkAAAAAAoAAAABAAAH0AAAAAxMaXN0RXh0ZXJuYWw=",
            "AAAAAAAAAAAAAAAJZ2V0X2xpc3RzAAAAAAAAAgAAAAAAAAAKZnJvbV9pbmRleAAAAAAD6AAAAAYAAAAAAAAABWxpbWl0AAAAAAAD6AAAAAYAAAABAAAD6gAAB9AAAAAMTGlzdEV4dGVybmFs",
            "AAAAAAAAAAAAAAATZ2V0X2xpc3RzX2Zvcl9vd25lcgAAAAABAAAAAAAAAAhvd25lcl9pZAAAABMAAAABAAAD6gAAB9AAAAAMTGlzdEV4dGVybmFs",
            "AAAAAAAAAAAAAAAYZ2V0X2xpc3RzX2Zvcl9yZWdpc3RyYW50AAAAAQAAAAAAAAANcmVnaXN0cmFudF9pZAAAAAAAABMAAAABAAAD6gAAB9AAAAAMTGlzdEV4dGVybmFs",
            "AAAAAAAAAAAAAAAUZ2V0X3Vwdm90ZXNfZm9yX2xpc3QAAAADAAAAAAAAAAdsaXN0X2lkAAAAAAoAAAAAAAAACmZyb21faW5kZXgAAAAAA+gAAAAGAAAAAAAAAAVsaW1pdAAAAAAAA+gAAAAGAAAAAQAAA+oAAAAT",
            "AAAAAAAAAAAAAAAdZ2V0X3Vwdm90ZWRfbGlzdHNfZm9yX2FjY291bnQAAAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAKZnJvbV9pbmRleAAAAAAD6AAAAAYAAAAAAAAABWxpbWl0AAAAAAAD6AAAAAYAAAABAAAD6gAAB9AAAAAMTGlzdEV4dGVybmFs",
            "AAAAAAAAAAAAAAAQZ2V0X3JlZ2lzdHJhdGlvbgAAAAEAAAAAAAAAD3JlZ2lzdHJhdGlvbl9pZAAAAAAKAAAAAQAAB9AAAAAUUmVnaXN0cmF0aW9uRXh0ZXJuYWw=",
            "AAAAAAAAAAAAAAAaZ2V0X3JlZ2lzdHJhdGlvbnNfZm9yX2xpc3QAAAAAAAQAAAAAAAAAB2xpc3RfaWQAAAAACgAAAAAAAAAPcmVxdWlyZWRfc3RhdHVzAAAAA+gAAAfQAAAAElJlZ2lzdHJhdGlvblN0YXR1cwAAAAAAAAAAAApmcm9tX2luZGV4AAAAAAPoAAAABgAAAAAAAAAFbGltaXQAAAAAAAPoAAAABgAAAAEAAAPqAAAH0AAAABRSZWdpc3RyYXRpb25FeHRlcm5hbA==",
            "AAAAAAAAAAAAAAAgZ2V0X3JlZ2lzdHJhdGlvbnNfZm9yX3JlZ2lzdHJhbnQAAAAEAAAAAAAAAA1yZWdpc3RyYW50X2lkAAAAAAAAEwAAAAAAAAAPcmVxdWlyZWRfc3RhdHVzAAAAA+gAAAfQAAAAElJlZ2lzdHJhdGlvblN0YXR1cwAAAAAAAAAAAApmcm9tX2luZGV4AAAAAAPoAAAABgAAAAAAAAAFbGltaXQAAAAAAAPoAAAABgAAAAEAAAPqAAAH0AAAABRSZWdpc3RyYXRpb25FeHRlcm5hbA==",
            "AAAAAAAAAAAAAAANaXNfcmVnaXN0ZXJlZAAAAAAAAAMAAAAAAAAAB2xpc3RfaWQAAAAD6AAAAAoAAAAAAAAADXJlZ2lzdHJhbnRfaWQAAAAAAAATAAAAAAAAAA9yZXF1aXJlZF9zdGF0dXMAAAAD6AAAB9AAAAASUmVnaXN0cmF0aW9uU3RhdHVzAAAAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAAFb3duZXIAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAHdXBncmFkZQAAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAA==",
            "AAAAAgAAAAAAAAAAAAAAC0NvbnRyYWN0S2V5AAAAAAwAAAAAAAAAAAAAAA1Db250cmFjdE93bmVyAAAAAAAAAAAAAAAAAAALTGlzdHNOdW1iZXIAAAAAAAAAAAAAAAAFTGlzdHMAAAAAAAAAAAAAAAAAAApMaXN0QWRtaW5zAAAAAAAAAAAAAAAAAAlPd25lZExpc3QAAAAAAAAAAAAAAAAAAA5SZWdpc3RyYW50TGlzdAAAAAAAAAAAAAAAAAATUmVnaXN0cmF0aW9uc051bWJlcgAAAAAAAAAAAAAAAA1SZWdpc3RyYXRpb25zAAAAAAAAAAAAAAAAAAAQTGlzdFJlZ2lzdHJhdGlvbgAAAAAAAAAAAAAAEFJlZ2lzdHJhdGlvbnNJRHMAAAAAAAAAAAAAAAdVcHZvdGVzAAAAAAAAAAAAAAAAC1VzZXJVcHZvdGVzAA=="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        create_list: (this.txFromJSON),
        update_list: (this.txFromJSON),
        delete_list: (this.txFromJSON),
        upvote: (this.txFromJSON),
        remove_upvote: (this.txFromJSON),
        transfer_ownership: (this.txFromJSON),
        add_admins: (this.txFromJSON),
        remove_admins: (this.txFromJSON),
        clear_admins: (this.txFromJSON),
        register_batch: (this.txFromJSON),
        unregister: (this.txFromJSON),
        update_registration: (this.txFromJSON),
        get_list: (this.txFromJSON),
        get_lists: (this.txFromJSON),
        get_lists_for_owner: (this.txFromJSON),
        get_lists_for_registrant: (this.txFromJSON),
        get_upvotes_for_list: (this.txFromJSON),
        get_upvoted_lists_for_account: (this.txFromJSON),
        get_registration: (this.txFromJSON),
        get_registrations_for_list: (this.txFromJSON),
        get_registrations_for_registrant: (this.txFromJSON),
        is_registered: (this.txFromJSON),
        owner: (this.txFromJSON),
        upgrade: (this.txFromJSON)
    };
}
