import React from "react"

const PrivacyPage = () => {
  React.useState(() => {
    if(typeof(window) !== "undefined") document.location.replace(`https://dothq.co/legal/privacy`);
  })

  return (
    <div>Redirecting you to https://dothq.co/legal/privacy...</div>
  )
}

export default PrivacyPage
