import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Form, { FormLayout } from '@/components/Forms'
import SignIn from '@/components/SignIn'
import { useQuery } from 'react-query'
import Button from '@/components/Button'
import { getMemberChallengeDataNovember } from '@/util/api'

// Become a Contributor: Virtual Coffee Hacktoberfest Initiative

{
	/* <Head>
			<title>Thank you for your interest!</title>
		</Head> */
}

export function NoAuth() {
	return (
		<FormLayout title="November Monthly Challenge" description="text here">
			<SignIn />
		</FormLayout>
	)
}

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

	if (!(articlesResponse.isSuccess || articlesResponse.isError)) {
		return null
	}

	return (
		<FormLayout title="November Monthly Challenge" description="YOLO">
			<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
				November 2021: NaNoWriMo
			</h1>
			<div className="prose mt-4">
				<p>
					📣 Challengers!!! It's November 1st and time for a new challenge! Just
					like last year, this month's challenge is **blogging**!
				</p>
				<p>
					Last year our common goal was to reach 50k words during the month and
					we didn't quite reach it, but there is no doubt we will this year! The
					themes for blogging are up to you, let's just try to keep a connection
					with the dev world.
				</p>
				<p>
					You can find a 
					<a href="https://virtualcoffee.io/monthlychallenges/nov-2021/">
						lot of ideas on the website
					</a>
					 to help you.
				</p>
				<p>
					If you are new to blogging and need advice on the platform, the style,
					the sharing part, have proofreading, ... our community is here to
					help. Use this channel 
					<a href="https://virtual-coffee-group.slack.com/archives/C01GN2TLLC8">
						<code>#content-creation</code>
					</a>
					 to post your questions, share your articles.
				</p>
				<p>Write a lot, write often! Good luck, and have fun!</p>
			</div>

			<div className="text-center mt-8 pt-8 border-t border-gray-200">
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
					Add your blog posts!
				</h1>

				<p className="mt-4 text-lg leading-6 text-gray-500">
					Any writing that was published in November 2021 will count towards our
					goal.
				</p>
			</div>

			{articlesResponse.data.results.length > 0 ? (
				<>
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg font-medium text-gray-900">
							Your Articles:
						</h3>
					</div>
					<div className="flex flex-col">
						<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Article
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Count
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Date
												</th>
												<th scope="col" className="relative px-6 py-3">
													<span className="sr-only">Edit</span>
												</th>
											</tr>
										</thead>
										<tbody>
											{articlesResponse.data.results.map(
												(article, articleIndex) => (
													<tr
														key={article.id}
														className={
															articleIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
														}
													>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
															<a href={article.Url}>{article.Title}</a>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{article['Word Count']}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{article['Date Published']}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<a
																href={`/monthly-challenges/november/${article.id}`}
																className="text-indigo-600 hover:text-indigo-900"
															>
																Edit
															</a>
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="text-lg leading-6 text-gray-500">
						<p className="mt-8 flex justify-between">
							<Button size="md" href="/monthly-challenges/november/new">
								Add New Post!
							</Button>
							<Button
								size="md"
								href="https://virtualcoffee.io/monthlychallenges/nov-2021/"
								target="_blank"
								rel="nofollow"
							>
								View Challenge Page
							</Button>
						</p>
					</div>
				</>
			) : (
				<div className="text-lg leading-6 text-gray-500">
					<p className="mt-8 text-center">
						<Button size="lg" href="/monthly-challenges/november/new">
							Add Your First Post!
						</Button>
					</p>
				</div>
			)}
		</FormLayout>
	)
}
