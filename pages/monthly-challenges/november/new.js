import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Form, { FormLayout } from '@/components/Forms'
import SignIn from '@/components/SignIn'
import { useQuery } from 'react-query'
import Button from '@/components/Button'
import { getMemberChallengeDataNovember } from '@/util/api'
import { NoAuth } from './index'

// Become a Contributor: Virtual Coffee Hacktoberfest Initiative

const intro = (
	<>
		<div className="text-center">
			<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
				Add your blog posts!
			</h1>
			<p className="mt-4 text-lg leading-6 text-gray-500">text goes here</p>
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
						<Button size="lg" href="/monthly-challenges/november">
							Back to Challenge Dashboard
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

	const articlesResponse = useQuery(
		'memberChallengeDataNovember',
		getMemberChallengeDataNovember,
		{ enabled: sessionStatus === 'authenticated' }
	)

	console.log({ articlesResponse })

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return <NoAuth />
	}

	return (
		<FormLayout title="November Monthly Challenge" description="YOLO">
			<Form
				session={session}
				errorMessage={error ? errorMessage : undefined}
				successView={successView}
				intro={intro}
				formKey="monthlyChallengeNovember"
				apiPath="monthly-challenges/november"
				fieldsetLegend="Add your article"
			/>
		</FormLayout>
	)
}
