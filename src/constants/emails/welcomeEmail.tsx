interface Props {
  name: string;
}

export default function WelcomeEmail({ name }: Props) {
  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        backgroundColor: "#0a0a0f",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "linear-gradient(145deg, rgba(20,20,35,0.95), rgba(10,10,20,0.95))",
          borderRadius: "16px",
          border: "1px solid rgba(120,120,255,0.25)",
          padding: "35px",
          boxShadow: "0 0 25px rgba(120,120,255,0.25), inset 0 0 20px rgba(80,80,255,0.15)",
        }}
      >
        {/* Neon Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "700",
            color: "#9f80ff",
            textShadow: "0 0 12px rgba(140,100,255,0.8), 0 0 28px rgba(120,90,255,0.4)",
            marginBottom: "25px",
          }}
        >
          WELCOME TO THE REALM ⚔️
        </h1>

        {/* Hero Text */}
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "600",
            color: "#ffffff",
            marginBottom: "15px",
          }}
        >
          {name}, your journey starts now.
        </h2>

        {/* Main Content */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.7",
            color: "#c9c9e6",
            marginBottom: "25px",
          }}
        >
          You've just unlocked access to a platform forged with the same energy that fuels legends
          like <b>Luffy</b>, <b>Asta</b>, <b>Isagi</b>, and
          <b> Goku</b>.
          <br />
          <br />
          This isn't just another application — this is a place built for people who refuse to live
          a normal life.
          <br />
          Your story is about to level up. 📈🔥
        </p>

        {/* Power Quote Block */}
        <div
          style={{
            borderLeft: "4px solid #8b5cf6",
            paddingLeft: "15px",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#bbaaff",
              fontStyle: "italic",
              lineHeight: "1.6",
              fontSize: "15px",
            }}
          >
            “In this world, power isn’t something you're given. It’s something you take… step by
            step, choice by choice.”
          </p>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href="#"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #6d28d9, #8b5cf6)",
              color: "#ffffff",
              padding: "14px 30px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              boxShadow: "0 0 15px rgba(140,100,255,0.6)",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            Enter the Dashboard
          </a>
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "45px",
            fontSize: "13px",
            color: "#6b6b86",
            textAlign: "center",
          }}
        >
          If this wasn't you, ignore this message — destiny waits for no one.
        </p>
      </div>
    </div>
  );
}
