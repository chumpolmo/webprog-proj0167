function ButtonTwo({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

function Button({ onClick, children }) {
    return (
      <button className="w-50 m-4 p-2 border bg-auto bg-indigo-500"
        onClick={onClick}
      >
        {children}
      </button>
    );
}
  
  function PlayButton({ movieName }) {
    function handlePlayClick() {
      alert(`Playing ${movieName}!`);
    }
  
    return (
      <Button onClick={handlePlayClick}>
        Play "{movieName}"
      </Button>
    );
  }

  function UploadButton() {
    return (
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    );
  }
  
  function Signup() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert('Submitting!');
      }}>
        <h1>Sign Up:</h1>
        <input className="h-30 p-2 border-1border-solid border-2 border-indigo-600 border-inherit" />
        <button className="h-25 w-50 m-4 p-2 border bg-auto bg-indigo-500">Send</button>
      </form>
    );
  }
  

  export default function Toolbar() {
    return (
      <div>
        <PlayButton movieName="Kiki's Delivery Service" />
        <UploadButton />
        <ButtonTwo onClick={() => alert('Update Profile!')}>
          Update Profile
        </ButtonTwo>
        <Signup />
      </div>
    );
  }
    