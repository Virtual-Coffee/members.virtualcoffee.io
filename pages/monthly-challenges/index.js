import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import {
	Card,
	CardHeader,
	CardHeaderActions,
	CardHeaderHeader,
	CardList,
	CardListItem,
	CardListItemValue,
	CardListItemKey,
} from '@/components/Card'
import Container from '@/components/Container'
import Button from '@/components/Button'
import SignIn from '@/components/SignIn'

export default function Page() {
	const { data: session, status: sessionStatus } = useSession()

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return (
			<Layout>
				<Container>
					<h1 className="text-center text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
						Virtual Coffee:
						<br className="xl:hidden" />
						<span className="text-orange-500"> Monthly Challenges</span>
					</h1>

					<SignIn />
				</Container>
			</Layout>
		)
	}

	return (
		<Layout title="VC Hacktoberfest Dashboard">
			<Container>
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
					Virtual Coffee Monthly Challenges
				</h1>
				<p className="mt-4 mb-8 text-lg leading-6 text-gray-500">
					Every month we have a monthly challenge - here's the spot to
					participate!
				</p>
				<div className="space-y-12">
					<Card>
						<CardHeader>
							<CardHeaderHeader
								title="November 2021: NaNoWriMo!"
								description={
									<>
										This month we're working together to blog 50,000 words!
										Based off the
										<a href="https://nanowrimo.org/">
											NanWriMo (National Novel Writing Month) Challenge
										</a>
										, we'll be doing the tech take on writing and working
										together towards the goal while posting on our own blogs.
									</>
								}
							/>
							<CardHeaderActions>
								<Button size="md" href="/monthly-challenges/november">
									Add your blog posts!
								</Button>
							</CardHeaderActions>
						</CardHeader>
						<CardList>
							<CardListItem>
								<CardListItemKey>Current Challenge</CardListItemKey>
								<CardListItemValue>
									<strong>November, 2021: NaNoWriMo!</strong> This month we're
									working together to blog 50,000 words! Based off the
									<a href="https://nanowrimo.org/">
										NanWriMo (National Novel Writing Month) Challenge
									</a>
									, we'll be doing the tech take on writing and working together
									towards the goal while posting on our own blogs.
								</CardListItemValue>
							</CardListItem>
						</CardList>
					</Card>
				</div>
			</Container>
		</Layout>
	)
}
