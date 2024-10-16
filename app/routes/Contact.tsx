function Profile() {
    return (
      <p>
        <img
          src="/images/profile.jpg"
          alt="Chumpol Mokarat"
          style={{ width: '100px' }}
        />
      </p>
    );
}

function Avatar({ person, size } : { person: any, size: number}) {
  return (
    <img
      className="avatar"
      src={person.imageId}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
  
export default function MyContact() {
    return (
      <div className="font-sans p-4">
        <h1 className="text-3xl">Hi, Chumpol Mokarat.</h1>
        <Avatar
        size={100}
        person={{ 
          name: 'Chumpol Mokarat', 
          imageId: '/images/profile1.jpg'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: '/images/profile2.jpg'
        }}
      />
      </div>
    );
}
