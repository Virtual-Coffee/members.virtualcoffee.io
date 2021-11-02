import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Form, { FormLayout } from '@/components/Forms'
import Button from '@/components/Button'
import { NoAuth } from './index'

const intro = (
	<>
		<div className="text-center">
			<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
				Update your Profile!
			</h1>
			<p className="mt-4 text-lg leading-6 text-gray-500">
				Update your Virtual Coffee Member Profile so we can know more about you!
			</p>
		</div>
	</>
)

{
	/* <Head>
			<title>Thank you for your interest!</title>
		</Head> */
}
const successView = (
	<div className="py-16 px-4  sm:px-6 lg:px-8 lg:py-24">
		<div className="relative max-w-2xl mx-auto">
			<div className="text-center">
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 flex justify-center">
					<span className="mr-4">🙌</span>
					<span>Nice work!</span>
					<span className="ml-4">🙌</span>
				</h1>
				<div className="text-lg leading-6 text-gray-500">
					<p className="mt-4">
						<Button size="lg" href="/">
							Back to Home Base
						</Button>
					</p>
				</div>
			</div>
		</div>
	</div>
)

export default function Page() {
	const { data: session, status: sessionStatus } = useSession()
	const router = useRouter()
	const { error, message: errorMessage } = router.query

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return <NoAuth />
	}

	return (
		<FormLayout
			title="Your Member Profile"
			description="Update your Virtual Coffee Member Profile"
		>
			<Form
				session={session}
				errorMessage={error ? errorMessage : undefined}
				successView={successView}
				intro={intro}
				formKey="profile"
				fieldsetLegend="Update your Virtual Coffee Member Profile"
				method="PUT"
			/>
		</FormLayout>
	)
}
