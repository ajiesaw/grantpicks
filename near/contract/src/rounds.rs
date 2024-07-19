use crate::*;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[borsh(crate = "near_sdk::borsh")]
#[serde(crate = "near_sdk::serde")]
pub struct CreateRoundParams {
    pub owner: AccountId,
    pub admins: Vec<AccountId>,
    pub name: String,
    pub description: String,
    pub contacts: Vec<Contact>,
    pub voting_start_ms: u64,
    pub voting_end_ms: u64,
    pub allow_applications: bool,
    pub application_start_ms: Option<u64>, // must be present if allow_applications is true
    pub application_end_ms: Option<u64>,   // must be present if allow_applications is true
    pub expected_amount: U128,             // NB: on Stellar this is an int (u128)
    pub use_whitelist: Option<bool>,
    pub num_picks_per_voter: u32,
    pub max_participants: Option<u32>,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[borsh(crate = "near_sdk::borsh")]
#[serde(crate = "near_sdk::serde")]
pub struct RoundDetailInternal {
    pub id: RoundId,
    pub owner: AccountId,
    pub admins: Vec<AccountId>,
    pub name: String,
    pub description: String,
    pub contacts: Vec<Contact>,
    pub allow_applications: bool,
    pub application_start_ms: Option<TimestampMs>, // must be present if allow_applications is true
    pub application_end_ms: Option<TimestampMs>,   // must be present if allow_applications is true
    pub voting_start_ms: TimestampMs,
    pub voting_end_ms: TimestampMs,
    pub blacklisted_voters: Vec<AccountId>, // todo: if these will grow large, consider storing on top-level contract instead
    pub whitelisted_voters: Option<Vec<AccountId>>, // todo: if these will grow large, consider storing on top-level contract instead
    pub use_whitelist: bool,
    pub expected_amount: u128,
    pub vault_balance: u128,
    pub num_picks_per_voter: u32,
    pub max_participants: u32,
}

impl RoundDetailInternal {
    pub fn is_caller_owner_or_admin(&self) -> bool {
        let caller = env::predecessor_account_id();
        self.owner == *caller || self.admins.contains(&caller)
    }

    pub fn to_external(self) -> RoundDetailExternal {
        RoundDetailExternal {
            id: self.id,
            owner: self.owner,
            admins: self.admins,
            name: self.name,
            description: self.description,
            contacts: self.contacts,
            allow_applications: self.allow_applications,
            application_start_ms: self.application_start_ms,
            application_end_ms: self.application_end_ms,
            voting_start_ms: self.voting_start_ms,
            voting_end_ms: self.voting_end_ms,
            blacklisted_voters: self.blacklisted_voters,
            whitelisted_voters: self.whitelisted_voters,
            use_whitelist: self.use_whitelist,
            expected_amount: U128(self.expected_amount),
            vault_balance: U128(self.vault_balance),
            num_picks_per_voter: self.num_picks_per_voter,
            max_participants: self.max_participants,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[borsh(crate = "near_sdk::borsh")]
#[serde(crate = "near_sdk::serde")]
pub struct RoundDetailExternal {
    pub id: RoundId,
    pub owner: AccountId,
    pub admins: Vec<AccountId>,
    pub name: String,
    pub description: String,
    pub contacts: Vec<Contact>,
    pub allow_applications: bool,
    pub application_start_ms: Option<TimestampMs>, // must be present if allow_applications is true
    pub application_end_ms: Option<TimestampMs>,   // must be present if allow_applications is true
    pub voting_start_ms: TimestampMs,
    pub voting_end_ms: TimestampMs,
    pub blacklisted_voters: Vec<AccountId>, // todo: if these will grow large, consider storing on top-level contract instead
    pub whitelisted_voters: Option<Vec<AccountId>>, // todo: if these will grow large, consider storing on top-level contract instead
    pub use_whitelist: bool,
    pub expected_amount: U128, // String for JSON purposes. NB: on Stellar this is an int (u128)
    pub vault_balance: U128,   // String for JSON purposes. NB: on Stellar this is an int (u128)
    pub num_picks_per_voter: u32,
    pub max_participants: u32,
}

impl RoundDetailExternal {
    pub fn to_internal(self) -> RoundDetailInternal {
        RoundDetailInternal {
            id: self.id,
            owner: self.owner,
            admins: self.admins,
            name: self.name,
            description: self.description,
            contacts: self.contacts,
            allow_applications: self.allow_applications,
            application_start_ms: self.application_start_ms,
            application_end_ms: self.application_end_ms,
            voting_start_ms: self.voting_start_ms,
            voting_end_ms: self.voting_end_ms,
            blacklisted_voters: self.blacklisted_voters,
            whitelisted_voters: self.whitelisted_voters,
            use_whitelist: self.use_whitelist,
            expected_amount: self.expected_amount.0,
            vault_balance: self.vault_balance.0,
            num_picks_per_voter: self.num_picks_per_voter,
            max_participants: self.max_participants,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[borsh(crate = "near_sdk::borsh")]
#[serde(crate = "near_sdk::serde")]
pub struct Contact {
    name: String,
    value: String,
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_round(&mut self, round_detail: CreateRoundParams) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let id = self.next_round_id;
        let round = RoundDetailInternal {
            id,
            owner: round_detail.owner,
            admins: round_detail.admins,
            name: round_detail.name,
            description: round_detail.description,
            contacts: round_detail.contacts,
            allow_applications: round_detail.allow_applications,
            application_start_ms: round_detail.application_start_ms,
            application_end_ms: round_detail.application_end_ms,
            voting_start_ms: round_detail.voting_start_ms,
            voting_end_ms: round_detail.voting_end_ms,
            blacklisted_voters: vec![],
            whitelisted_voters: None,
            use_whitelist: round_detail.use_whitelist.unwrap_or(false),
            expected_amount: round_detail.expected_amount.0,
            vault_balance: 0,
            num_picks_per_voter: round_detail.num_picks_per_voter,
            max_participants: round_detail.max_participants.unwrap_or(0),
        };
        validate_round_detail(&round);
        self.rounds_by_id.insert(id, round.clone());
        self.next_round_id += 1;
        self.applications_for_round_by_internal_project_id.insert(
            id,
            UnorderedMap::new(StorageKey::ApplicationsForRoundByInternalProjectIdInner {
                round_id: id,
            }),
        );
        // add new mapping for approved applicants
        self.approved_internal_project_ids_for_round.insert(
            id,
            UnorderedSet::new(StorageKey::ApprovedInternalProjectIdsForRoundInner { round_id: id }),
        );
        // clean-up
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_create_round(&round_external);
        round_external.clone()
    }

    #[payable]
    pub fn update_round(
        &mut self,
        round_id: RoundId,
        mut round_detail: RoundDetailExternal,
    ) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let round = self
            .rounds_by_id
            .get_mut(&round_id)
            .expect("Round not found");

        // Verify caller is owner or admin
        if round.owner != caller && !round.admins.contains(&caller) {
            panic!("Only owner or admin can update round");
        }

        // If not owner, set admins to existing
        if round.owner != caller {
            round_detail.admins = round.admins.clone();
        }

        let round_detail_internal = RoundDetailInternal {
            id: round_detail.id,
            owner: round_detail.owner,
            admins: round_detail.admins,
            name: round_detail.name,
            description: round_detail.description,
            contacts: round_detail.contacts,
            allow_applications: round_detail.allow_applications,
            application_start_ms: round_detail.application_start_ms,
            application_end_ms: round_detail.application_end_ms,
            voting_start_ms: round_detail.voting_start_ms,
            voting_end_ms: round_detail.voting_end_ms,
            blacklisted_voters: round_detail.blacklisted_voters,
            whitelisted_voters: round_detail.whitelisted_voters,
            use_whitelist: round_detail.use_whitelist,
            expected_amount: round_detail.expected_amount.0,
            vault_balance: round_detail.vault_balance.0,
            num_picks_per_voter: round_detail.num_picks_per_voter,
            max_participants: round_detail.max_participants,
        };

        self.rounds_by_id
            .insert(round_id, round_detail_internal.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round_detail_internal.to_external();
        log_update_round(&round_external);
        round_external.clone()
    }

    #[payable]
    /// Must have no balance & no applications
    pub fn delete_round(&mut self, round_id: RoundId) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner
        if round.owner != caller {
            panic!("Only owner can delete round");
        }

        // Verify no balance
        assert_eq!(round.vault_balance, 0, "Round must have no balance");

        // Verify no applications
        let applications_for_round = self
            .applications_for_round_by_internal_project_id
            .get(&round_id)
            .expect("Applications for round not found");
        assert_eq!(
            applications_for_round.len(),
            0,
            "Round must have no applications"
        );

        self.rounds_by_id.remove(&round_id);
        self.applications_for_round_by_internal_project_id
            .remove(&round_id);
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_delete_round(&round_external);
        round_external
    }

    #[payable]
    pub fn change_voting_period(
        &mut self,
        round_id: RoundId,
        start_ms: TimestampMs,
        end_ms: TimestampMs,
    ) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner or admin
        if round.owner != caller && !round.admins.contains(&caller) {
            panic!("Only owner or admin can change voting period");
        }

        round.voting_start_ms = start_ms;
        round.voting_end_ms = end_ms;
        validate_round_detail(&round);
        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn change_allow_applications(
        &mut self,
        round_id: RoundId,
        allow_applications: bool,
        start_ms: Option<TimestampMs>,
        end_ms: Option<TimestampMs>,
    ) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner or admin
        if round.owner != caller && !round.admins.contains(&caller) {
            panic!("Only owner or admin can change allow applications");
        }

        round.allow_applications = allow_applications;
        // if applications are not allowed, then application start and end times should be removed...
        if !allow_applications {
            round.application_start_ms = None;
            round.application_end_ms = None;
        } else {
            // ...and vice versa, they should be provided (validate_round_detail will verify this)
            round.application_start_ms = start_ms;
            round.application_end_ms = end_ms;
        }
        validate_round_detail(&round);
        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn change_application_period(
        &mut self,
        round_id: RoundId,
        start_ms: TimestampMs,
        end_ms: TimestampMs,
    ) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner or admin
        if round.owner != caller && !round.admins.contains(&caller) {
            panic!("Only owner or admin can change application period");
        }

        round.application_start_ms = Some(start_ms);
        round.application_end_ms = Some(end_ms);
        validate_round_detail(&round);
        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn change_expected_amount(
        &mut self,
        round_id: RoundId,
        expected_amount: U128,
    ) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner or admin
        if round.owner != caller && !round.admins.contains(&caller) {
            panic!("Only owner or admin can change expected amount");
        }

        round.expected_amount = expected_amount.0;
        validate_round_detail(&round);
        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn close_voting_period(&mut self, round_id: RoundId) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner or admin
        if round.owner != caller && !round.admins.contains(&caller) {
            panic!("Only owner or admin can close voting period");
        }

        round.voting_end_ms = env::block_timestamp_ms();
        validate_round_detail(&round);
        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn add_admins(&mut self, round_id: RoundId, admins: Vec<AccountId>) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner
        if round.owner != caller {
            panic!("Only owner can add admins");
        }

        for admin in admins {
            if !round.admins.contains(&admin) {
                round.admins.push(admin);
            }
        }

        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn remove_admins(
        &mut self,
        round_id: RoundId,
        admins: Vec<AccountId>,
    ) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner
        if round.owner != caller {
            panic!("Only owner can remove admins");
        }

        round.admins = round
            .admins
            .iter()
            .filter(|admin| !admins.contains(admin))
            .cloned()
            .collect();

        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn set_admins(&mut self, round_id: RoundId, admins: Vec<AccountId>) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner
        if round.owner != caller {
            panic!("Only owner can set admins");
        }

        round.admins = admins;

        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn clear_admins(&mut self, round_id: RoundId) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let caller = env::predecessor_account_id();
        let mut round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();

        // Verify caller is owner
        if round.owner != caller {
            panic!("Only owner can clear admins");
        }

        round.admins = vec![];

        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_update_round(&round_external);
        round_external
    }

    #[payable]
    pub fn deposit_to_round(&mut self, round_id: RoundId) -> RoundDetailExternal {
        let initial_storage_usage = env::storage_usage();
        let round = self
            .rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone();
        let caller = env::predecessor_account_id();
        let attached_deposit = env::attached_deposit();
        let vault_balance = round.vault_balance + attached_deposit.as_yoctonear();
        let round = RoundDetailInternal {
            vault_balance,
            ..round
        };
        self.rounds_by_id.insert(round_id, round.clone());
        refund_deposit(initial_storage_usage, None);
        let round_external = round.to_external();
        log_deposit(
            &round_external,
            U128(attached_deposit.as_yoctonear()),
            &caller,
        );
        round_external
        // TODO: determine whether deposit record should be saved on-chain (not currently done, only event is logged)
    }

    // GETTER/VIEW METHODS

    pub fn get_rounds(
        &self,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> Vec<RoundDetailExternal> {
        let from_index = from_index.unwrap_or(0);
        let limit = limit.unwrap_or(self.default_page_size);
        if from_index > self.rounds_by_id.len() as u64 {
            // TODO: check for off-by-one bug here
            return vec![];
        }
        self.rounds_by_id
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .map(|(_, round)| round.clone().to_external())
            .collect()
    }

    /// Retrieve a round by its ID
    pub fn get_round(&self, round_id: RoundId) -> RoundDetailExternal {
        self.rounds_by_id
            .get(&round_id)
            .expect("Round not found")
            .clone()
            .to_external()
    }

    // pub fn add_projects_to_round(&mut self, round_id: RoundId, projects: Vec<AccountId>) -> &Round {
    //     let caller = env::predecessor_account_id();
    //     let round = self
    //         .rounds_by_id
    //         .get_mut(&round_id)
    //         .expect("Round not found");

    //     // Verify caller is owner or admin
    //     if round.owner != caller && !round.admins.contains(&caller) {
    //         panic!("Only owner or admin can add projects to round");
    //     }

    //     for project in projects {
    //         let internal_id = self.next_internal_id;
    //         self.project_id_to_internal_id
    //             .insert(project.clone(), internal_id);
    //         self.internal_id_to_project_id
    //             .insert(internal_id, project.clone());
    //         round.approved_applicants.insert(project);
    //         self.next_internal_id += 1;
    //     }

    //     self.rounds_by_id.get(&round_id).unwrap()
    // }
}