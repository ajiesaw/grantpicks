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
        contractId: "CBT2ARJZIGLHWKTJ3WET5L4NYFABO7MLTSAIU35BJXFYO62XLSZX2QS2",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAACVJvdW5kSW5mbwAAAAAAAAIAAAAAAAAAEGNvbnRyYWN0X2FkZHJlc3MAAAATAAAAAAAAAAhyb3VuZF9pZAAAAAo=",
            "AAAAAQAAAAAAAAAAAAAAE1JvdW5kSW5mb1dpdGhEZXRhaWwAAAAAAwAAAAAAAAAQY29udHJhY3RfYWRkcmVzcwAAABMAAAAAAAAABmRldGFpbAAAAAAH0AAAAAtSb3VuZERldGFpbAAAAAAAAAAACHJvdW5kX2lkAAAACg==",
            "AAAAAQAAAAAAAAAAAAAAEUNyZWF0ZVJvdW5kUGFyYW1zAAAAAAAADQAAAAAAAAAGYWRtaW5zAAAAAAPqAAAAEwAAAAAAAAASYXBwbGljYXRpb25fZW5kX21zAAAAAAAGAAAAAAAAABRhcHBsaWNhdGlvbl9zdGFydF9tcwAAAAYAAAAAAAAACGNvbnRhY3RzAAAD6gAAB9AAAAAHQ29udGFjdAAAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAAD2V4cGVjdGVkX2Ftb3VudAAAAAAKAAAAAAAAABBtYXhfcGFydGljaXBhbnRzAAAD6AAAAAQAAAAAAAAABG5hbWUAAAAQAAAAAAAAABNudW1fcGlja3NfcGVyX3ZvdGVyAAAAA+gAAAAEAAAAAAAAAA11c2Vfd2hpdGVsaXN0AAAAAAAD6AAAAAEAAAAAAAAACXZpZGVvX3VybAAAAAAAABAAAAAAAAAADXZvdGluZ19lbmRfbXMAAAAAAAAGAAAAAAAAAA92b3Rpbmdfc3RhcnRfbXMAAAAABg==",
            "AAAAAQAAAAAAAAAAAAAAB0NvbnRhY3QAAAAAAgAAAAAAAAAEbmFtZQAAABAAAAAAAAAABXZhbHVlAAAAAAAAEA==",
            "AAAAAQAAAAAAAAAAAAAADlJDQ3JlYXRlUGFyYW1zAAAAAAAOAAAAAAAAAAZhZG1pbnMAAAAAA+oAAAATAAAAAAAAABJhcHBsaWNhdGlvbl9lbmRfbXMAAAAAAAYAAAAAAAAAFGFwcGxpY2F0aW9uX3N0YXJ0X21zAAAABgAAAAAAAAAIY29udGFjdHMAAAPqAAAH0AAAAAlSQ0NvbnRhY3QAAAAAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAAD2V4cGVjdGVkX2Ftb3VudAAAAAAKAAAAAAAAAAJpZAAAAAAACgAAAAAAAAAQbWF4X3BhcnRpY2lwYW50cwAAA+gAAAAEAAAAAAAAAARuYW1lAAAAEAAAAAAAAAATbnVtX3BpY2tzX3Blcl92b3RlcgAAAAPoAAAABAAAAAAAAAANdXNlX3doaXRlbGlzdAAAAAAAA+gAAAABAAAAAAAAAAl2aWRlb191cmwAAAAAAAAQAAAAAAAAAA12b3RpbmdfZW5kX21zAAAAAAAABgAAAAAAAAAPdm90aW5nX3N0YXJ0X21zAAAAAAY=",
            "AAAAAQAAAAAAAAAAAAAACVJDQ29udGFjdAAAAAAAAAIAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAV2YWx1ZQAAAAAAABA=",
            "AAAAAQAAAAAAAAAAAAAAC1JvdW5kRGV0YWlsAAAAABAAAAAAAAAAEmFwcGxpY2F0aW9uX2VuZF9tcwAAAAAABgAAAAAAAAAUYXBwbGljYXRpb25fc3RhcnRfbXMAAAAGAAAAAAAAAAhjb250YWN0cwAAA+oAAAfQAAAACVJDQ29udGFjdAAAAAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAPZXhwZWN0ZWRfYW1vdW50AAAAAAoAAAAAAAAAAmlkAAAAAAAKAAAAAAAAAAxpc19jb21wbGV0ZWQAAAABAAAAAAAAABBtYXhfcGFydGljaXBhbnRzAAAABAAAAAAAAAAEbmFtZQAAABAAAAAAAAAAE251bV9waWNrc19wZXJfdm90ZXIAAAAABAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAA11c2Vfd2hpdGVsaXN0AAAAAAAAAQAAAAAAAAANdmF1bHRfYmFsYW5jZQAAAAAAAAoAAAAAAAAACXZpZGVvX3VybAAAAAAAABAAAAAAAAAADXZvdGluZ19lbmRfbXMAAAAAAAAGAAAAAAAAAA92b3Rpbmdfc3RhcnRfbXMAAAAABg==",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAQcmVnaXN0cnlfYWRkcmVzcwAAABMAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAA==",
            "AAAAAAAAAAAAAAAMY3JlYXRlX3JvdW5kAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAZwYXJhbXMAAAAAB9AAAAARQ3JlYXRlUm91bmRQYXJhbXMAAAAAAAABAAAH0AAAAAlSb3VuZEluZm8AAAA=",
            "AAAAAAAAAAAAAAAKZ2V0X3JvdW5kcwAAAAAAAgAAAAAAAAAEc2tpcAAAA+gAAAAGAAAAAAAAAAVsaW1pdAAAAAAAA+gAAAAGAAAAAQAAA+oAAAfQAAAAE1JvdW5kSW5mb1dpdGhEZXRhaWwA",
            "AAAAAAAAAAAAAAAJYWRkX2FkbWluAAAAAAAAAgAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAASdHJhbnNmZXJfb3duZXJzaGlwAAAAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACW5ld19vd25lcgAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAMcmVtb3ZlX2FkbWluAAAAAgAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAGYWRtaW5zAAAAAAAAAAAAAQAAA+oAAAAT",
            "AAAAAAAAAAAAAAAFb3duZXIAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAHdXBncmFkZQAAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAADW5ld193YXNtX2hhc2gAAAAAAAPuAAAAIAAAAAA=",
            "AAAAAgAAAAAAAAAAAAAAC0NvbnRyYWN0S2V5AAAAAAcAAAAAAAAAAAAAAAtSb3VuZE51bWJlcgAAAAAAAAAAAAAAAAZSb3VuZHMAAAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFT3duZXIAAAAAAAAAAAAAAAAAAARXYXNtAAAAAAAAAAAAAAANVG9rZW5Db250cmFjdAAAAAAAAAAAAAAAAAAAD1Byb2plY3RDb250cmFjdAA="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        create_round: (this.txFromJSON),
        get_rounds: (this.txFromJSON),
        add_admin: (this.txFromJSON),
        transfer_ownership: (this.txFromJSON),
        remove_admin: (this.txFromJSON),
        admins: (this.txFromJSON),
        owner: (this.txFromJSON),
        upgrade: (this.txFromJSON)
    };
}
