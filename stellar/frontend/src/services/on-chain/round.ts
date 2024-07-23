import Contracts from '@/lib/contracts'
import {
	IGetRoundApplicationsResponse,
	IGetRoundsResponse,
} from '@/types/on-chain'
import { u128, u32, u64 } from '@stellar/stellar-sdk/contract'
import { Contact } from 'round-client'

interface GetRoundsParams {
	skip: number
	limit: number
}

interface GetRoundApplicationsParams {
	round_id: bigint
	skip: number
	limit: number
}

interface GetRoundAdmins {
	round_id: bigint
}

interface GetRoundInfoParams {
	round_id: bigint
}

export interface CreateRoundContact {
	name: string
	value: string
}

export interface CreateRoundParams {
	admins: string[]
	allow_applications: boolean
	application_end_ms: u64
	application_start_ms: u64
	contacts: Contact[]
	description: string
	expected_amount: u128
	is_video_required: boolean
	max_participants: u32
	name: string
	num_picks_per_voter: u32
	owner: string
	use_whitelist: boolean
	voting_end_ms: u64
	voting_start_ms: u64
}

export const getRounds: (
	params: GetRoundsParams,
	contract: Contracts,
) => Promise<IGetRoundsResponse[]> = async (
	params: GetRoundsParams,
	contract: Contracts,
) => {
	let skip = params.skip ? params.skip : 0
	let limit = params.limit ? params.limit : 10

	let rounds = await contract.round_contract.get_rounds({
		skip: BigInt(skip),
		limit: BigInt(limit),
	})
	return rounds.result
}

export const getRoundAdmins: (
	params: GetRoundAdmins,
	contract: Contracts,
) => Promise<string[]> = async (
	params: GetRoundAdmins,
	contract: Contracts,
) => {
	let rounds = await contract.round_contract.admins({
		round_id: params.round_id,
	})
	return rounds.result
}

export const getRoundApplications: (
	params: GetRoundApplicationsParams,
	contract: Contracts,
) => Promise<IGetRoundApplicationsResponse[]> = async (
	params: GetRoundApplicationsParams,
	contract: Contracts,
) => {
	let skip = params.skip ? params.skip : 0
	let limit = params.limit ? params.limit : 10

	let rounds = await contract.round_contract.get_applications_for_round({
		round_id: BigInt(params.round_id),
		skip: BigInt(skip),
		limit: BigInt(limit),
	})
	return rounds.result
}

export const getRoundInfo: (
	params: GetRoundInfoParams,
	contract: Contracts,
) => Promise<IGetRoundsResponse> = async (
	params: GetRoundInfoParams,
	contract: Contracts,
) => {
	let round = await contract.round_contract.round_info({
		round_id: params.round_id,
	})
	return round.result
}

export const createRound: (
	caller: string,
	params: CreateRoundParams,
	contract: Contracts,
) => Promise<IGetRoundsResponse> = async (
	caller: string,
	params: CreateRoundParams,
	contract: Contracts,
) => {
	let round = await contract.round_contract.create_round({
		caller,
		round_detail: params,
	})
	return round.result
}
