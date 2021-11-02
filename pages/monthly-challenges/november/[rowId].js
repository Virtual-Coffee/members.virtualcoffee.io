import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Form, { FormLayout } from '@/components/Forms'
import SignIn from '@/components/SignIn'
import { useQuery } from 'react-query'
import Button from '@/components/Button'
import { getMemberChallengeDataNovember } from '@/util/api'
import { NoAuth } from '.'

// Become a Contributor: Virtual Coffee Hacktoberfest Initiative

const intro = (
	<>
		<div className="text-center">
			<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
				Add your blog posts!
			</h1>
			<p className="mt-4 text-lg leading-6 text-gray-500">
				Any writing that was published in November 2021 will count towards our
				goal.
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
					<span>Post Updated!</span>
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
	const { error, message: errorMessage, rowId } = router.query

	const previousFormSubmission = useQuery(
		['memberChallengeDataNovember', rowId],
		getMemberChallengeDataNovember,
		{ enabled: sessionStatus === 'authenticated' }
	)

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return <NoAuth />
	}

	if (previousFormSubmission.isLoading) {
		return (
			<FormLayout title="November Monthly Challenge">
				<p className="mt-4 text-lg leading-6 text-gray-500">Loading...</p>
			</FormLayout>
		)
	}

	if (!previousFormSubmission.data || previousFormSubmission.isError) {
		return (
			<FormLayout
				title="Error"
				description="There was an error loading this article"
			>
				<div className="text-center">
					<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
						Error
					</h1>
					<p className="mt-4 text-lg leading-6 text-gray-500">
						There was an error loading this article. Please go back to the
						challenge dashboard and try again.
					</p>
					<div className="text-lg leading-6 text-gray-500">
						<p className="mt-4">
							<Button size="lg" href="/monthly-challenges/november">
								Back to Challenge Dashboard
							</Button>
						</p>
					</div>
				</div>
			</FormLayout>
		)
	}

	return (
		<FormLayout
			title="November Monthly Challenge"
			description="Any writing that was published in November 2021 will count towards our
		goal."
		>
			<Form
				session={session}
				previousFormSubmission={
					previousFormSubmission?.data?.success
						? previousFormSubmission.data.fields
						: null
				}
				errorMessage={error ? errorMessage : undefined}
				successView={successView}
				intro={intro}
				formKey="monthlyChallengeNovember"
				apiPath={`monthly-challenges/november/${rowId}`}
				method="PUT"
				fieldsetLegend="November Monthly Challenge Details"
			/>
		</FormLayout>
	)
}
