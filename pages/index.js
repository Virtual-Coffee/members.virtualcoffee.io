import { useSession, getSession } from 'next-auth/react'
import Layout from '../components/Layout'
import {
	Card,
	CardHeader,
	CardHeaderActions,
	CardHeaderHeader,
	CardList,
	CardListItem,
	CardListItemValue,
	CardListItemKey,
} from '../components/Card'
import Container from '../components/Container'
import Button from '../components/Button'
import SignIn from '../components/SignIn'

export default function Page() {
	const { data: session, status: sessionStatus } = useSession()

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return (
			<Layout title="VC Members Home Base">
				<Container>
					<h1 className="text-center text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
						Virtual Coffee:
						<br className="xl:hidden" />
						<span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-pink-450">
							{' '}
							Members Home Base
						</span>
					</h1>

					<SignIn />
				</Container>
			</Layout>
		)
	}

	const profileValues = {
		Name: session?.profile?.Name || session?.githubUser.name || undefined,
		GitHubUsername:
			session?.profile?.Username || session?.githubUser?.login || undefined,
		TwitterUsername: session?.profile?.['TwitterUsername'] || undefined,
		Pronouns: session?.profile?.Pronouns || undefined,
		Email: session?.profile?.Email || session?.githubUser?.email || undefined,
		IsMember: session?.profile?.IsMember || undefined,
		AllowSocialSharing: session?.profile?.AllowSocialSharing || undefined,
	}

	return (
		<Layout title="VC Members Home Base">
			<Container>
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
					Virtual Coffee:{' '}
					<span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-pink-450">
						Members Home Base
					</span>
				</h1>
				<p className="mt-4 mb-8 text-lg leading-6 text-gray-500">Yay!</p>
				<div className="space-y-12">
					<Card>
						<CardHeader>
							<CardHeaderHeader
								title="Monthly Challenges"
								description="Every month we have a monthly challenge - here's the spot to participate!"
							/>
							<CardHeaderActions>
								<Button size="md" href="/monthly-challenges">
									Check out the Monthly Challenges!
								</Button>
							</CardHeaderActions>
						</CardHeader>
						<CardList>
							<CardListItem>
								<CardListItemKey>Current Challenge</CardListItemKey>
								<CardListItemValue>
									<strong>November, 2021: NaNoWriMo!</strong> This month we're
									working together to blog 50,000 words! Based off the{' '}
									<a
										href="https://nanowrimo.org/"
										className="text-indigo-600 hover:text-indigo-900 hover:underline"
									>
										NaNoWriMo (National Novel Writing Month) Challenge
									</a>
									, we'll be doing the tech take on writing and working together
									towards the goal while posting on our own blogs.
								</CardListItemValue>
							</CardListItem>
						</CardList>
					</Card>
					<Card>
						<CardHeader>
							<CardHeaderHeader
								title="Member Profile"
								description="Update your Virtual Coffee Member Profile so we can know more about you!"
							/>
							<CardHeaderActions>
								<Button size="md" href="/profile">
									Update your Profile
								</Button>
							</CardHeaderActions>
						</CardHeader>
						<CardList>
							<CardListItem>
								<CardListItemKey>Name</CardListItemKey>
								<CardListItemValue>
									{profileValues.Name ? (
										<strong>{profileValues.Name}</strong>
									) : (
										<em>Not set</em>
									)}
								</CardListItemValue>
							</CardListItem>
							<CardListItem>
								<CardListItemKey>Pronouns</CardListItemKey>
								<CardListItemValue>
									{profileValues.Pronouns ? (
										<strong>{profileValues.Pronouns}</strong>
									) : (
										<em>Not set</em>
									)}
								</CardListItemValue>
							</CardListItem>
							<CardListItem>
								<CardListItemKey>Email</CardListItemKey>
								<CardListItemValue>
									{profileValues.Email ? (
										<strong>{profileValues.Email}</strong>
									) : (
										<em>Not set</em>
									)}
								</CardListItemValue>
							</CardListItem>
							<CardListItem>
								<CardListItemKey>GitHub Username</CardListItemKey>
								<CardListItemValue>
									{profileValues.GitHubUsername ? (
										<strong>{profileValues.GitHubUsername}</strong>
									) : (
										<em>Not set</em>
									)}
								</CardListItemValue>
							</CardListItem>
							<CardListItem>
								<CardListItemKey>Twitter Username</CardListItemKey>
								<CardListItemValue>
									{profileValues.TwitterUsername ? (
										<strong>{profileValues.TwitterUsername}</strong>
									) : (
										<em>Not set</em>
									)}
								</CardListItemValue>
							</CardListItem>
							<CardListItem>
								<CardListItemKey>Social Sharing Consent</CardListItemKey>
								<CardListItemValue>
									<div className="text-sm font-medium text-gray-500">
										Are you comfortable with Virtual Coffee highlighting (with
										consent) your project/contributions on Social Media?
										(Twitter, Instagram)
									</div>
									{profileValues.AllowSocialSharing ? (
										<strong>{profileValues.AllowSocialSharing}</strong>
									) : (
										<em>Not set</em>
									)}
								</CardListItemValue>
							</CardListItem>
						</CardList>
					</Card>
				</div>
			</Container>
		</Layout>
	)
}
