import {
	ISupportedWallet,
	StellarWalletsKit,
} from '@creit.tech/stellar-wallets-kit'
import { Wallet, WalletSelector } from '@near-wallet-selector/core'
import {
	Account,
	SignMessageMethod,
} from '@near-wallet-selector/core/src/lib/wallet'
import { WalletSelectorModal } from '@near-wallet-selector/modal-ui'
import { Dispatch, SetStateAction } from 'react'
import { IGetRoundsResponse } from './on-chain'

export interface IWalletContext {
	connectedWallet: 'near' | 'stellar' | null
	//near
	nearSelector: WalletSelector | null
	nearModal: WalletSelectorModal | null
	nearWallet: (Wallet & SignMessageMethod) | null
	nearAccounts: Account[]
	onOpenNearWallet: () => void
	onSignOut: () => Promise<void>
	onCheckConnected: (selector: WalletSelector) => Promise<void>
	//stellar
	stellarKit: StellarWalletsKit | null
	stellarPubKey: string
	onOpenStellarWallet: (onSelected?: (option: ISupportedWallet) => void) => void
}

export interface IModalContextProps {
	isOpen: boolean
}

export interface IVoteConfirmationModalContextProps extends IModalContextProps {
	doc?: IGetRoundsResponse
}

export interface IModalContext {
	successFundRoundModalProps: IModalContextProps
	setSuccessFundRoundModalProps: Dispatch<SetStateAction<IModalContextProps>>
	setApplyProjectInitProps: Dispatch<SetStateAction<IModalContextProps>>
	setVoteConfirmationProps: Dispatch<
		SetStateAction<IVoteConfirmationModalContextProps>
	>
	setCreateProjectFormMainProps: Dispatch<SetStateAction<IModalContextProps>>
}

export interface ICreateProjectForm {
	title: string
	project_id: string
	description: string
	considering_desc: string
	team_member: string[]
	smart_contracts: {
		chain: string
		address: string
	}[]
	is_open_source: boolean
	github_urls: string[]
	contacts: {
		platform: string
		link_url: string
	}[]
	funding_histories: {
		source: string
		date: Date
		denomination: string
		amount: string
		description: string
	}[]
	is_havent_raised: boolean
	video: {
		url: string
		file?: File
	}
}

export interface ICreateProjectFormContext {
	data: ICreateProjectForm
	setData: Dispatch<SetStateAction<ICreateProjectForm>>
	step: number
	setStep: Dispatch<SetStateAction<number>>
	onClose: () => void
}

export interface IGlobalContext {
	stellarPrice: number
	nearPrice: number
}
