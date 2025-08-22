interface UserPageProps {
  params: { username: string }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div>
      <h1>Welcome, {params.username}!</h1>
      <p>This is your personalized page.</p>
    </div>
  );
}
