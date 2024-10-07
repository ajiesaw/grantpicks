import IconCube from '@/app/components/svgs/IconCube'
import IconNear from '@/app/components/svgs/IconNear'
import IconStellar from '@/app/components/svgs/IconStellar'
import React from 'react'
import { useMyProject } from './MyProjectProvider'
import { formatStroopToXlm } from '@/utils/helper'
import { GPProjectStats } from '@/models/stats'

export interface IMyProjectHeaderProps {
	stats: GPProjectStats
}

const MyProjectHeader = ({ stats }: IMyProjectHeaderProps) => {
	return (
		<>
			<p className="text-[62px] font-black text-grantpicks-black-950 mb-8 md:mb-10 lg:mb-14">
				MY PROJECT
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-8">
				<div className="p-3 md:p-4 lg:p-5 rounded-xl border border-black/10 flex items-center space-x-4 bg-white">
					<div className="border border-black/10 p-2 rounded-full">
						<IconCube size={24} className="fill-grantpicks-black-400" />
					</div>
					<div>
						<p className="text-[25px] font-normal text-grantpicks-black-950">
							{stats.rounds_participated}
						</p>
						<p className="text-xs font-semibold text-grantpicks-black-600">
							ROUNDS PARTICIPATED
						</p>
					</div>
				</div>
				<div className="p-3 md:p-4 lg:p-5 rounded-xl border border-black/10 flex items-center space-x-4 bg-white">
					<div className="border border-black/10 p-2 rounded-full">
						<IconStellar size={24} className="fill-grantpicks-black-400" />
					</div>
					<div>
						<p className="text-[25px] font-normal text-grantpicks-black-950">
							{formatStroopToXlm(BigInt(stats.total_funds_received))} XLM
						</p>
						<p className="text-xs font-semibold text-grantpicks-black-600">
							FUNDING RECEIVED{' '}
						</p>
					</div>
				</div>
				<div className="p-3 md:p-4 lg:p-5 rounded-xl border border-black/10 flex items-center space-x-4 bg-white">
					<div className="border border-black/10 p-2 rounded-full">
						<IconCube size={24} className="fill-grantpicks-black-400" />
					</div>
					<div>
						<p className="text-[25px] font-normal text-grantpicks-black-950">
							{stats.total_votes}
						</p>
						<p className="text-xs font-semibold text-grantpicks-black-600">
							TOTAL VOTES{' '}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default MyProjectHeader
