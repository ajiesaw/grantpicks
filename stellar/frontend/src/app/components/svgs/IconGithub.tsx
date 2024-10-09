import { IconProps } from '@/types/icon'
import React from 'react'

const IconGithub = ({ size, className }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.0083 0.166016C4.47396 0.166016 0 4.67295 0 10.2486C0 14.7056 2.86662 18.4784 6.84337 19.8136C7.34057 19.914 7.52269 19.5966 7.52269 19.3297C7.52269 19.096 7.5063 18.2948 7.5063 17.4599C4.72224 18.061 4.14249 16.2581 4.14249 16.2581C3.69507 15.0896 3.03215 14.7892 3.03215 14.7892C2.12092 14.1716 3.09852 14.1716 3.09852 14.1716C4.10931 14.2383 4.63968 15.2065 4.63968 15.2065C5.53431 16.7421 6.97591 16.3082 7.55588 16.0411C7.63864 15.39 7.90394 14.9393 8.18561 14.689C5.96513 14.4553 3.6289 13.5872 3.6289 9.71442C3.6289 8.61265 4.02633 7.71124 4.65607 7.01021C4.55672 6.75987 4.20866 5.7247 4.75564 4.33924C4.75564 4.33924 5.60069 4.0721 7.5061 5.37419C8.32186 5.15348 9.16316 5.04121 10.0083 5.04027C10.8533 5.04027 11.7148 5.15724 12.5102 5.37419C14.4158 4.0721 15.2609 4.33924 15.2609 4.33924C15.8079 5.7247 15.4596 6.75987 15.3603 7.01021C16.0066 7.71124 16.3876 8.61265 16.3876 9.71442C16.3876 13.5872 14.0514 14.4385 11.8143 14.689C12.1789 15.0061 12.4936 15.607 12.4936 16.5586C12.4936 17.9106 12.4772 18.9958 12.4772 19.3295C12.4772 19.5966 12.6596 19.914 13.1566 19.8138C17.1333 18.4781 20 14.7056 20 10.2486C20.0163 4.67295 15.526 0.166016 10.0083 0.166016Z"
				fill="#737373"
			/>
		</svg>
	)
}

export default IconGithub
