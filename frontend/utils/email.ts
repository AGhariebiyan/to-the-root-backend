import emailjs from '@emailjs/browser'

function validateEmail(email: any) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
}

async function sendEmail(emailTemplateId: string, templateParams: any) {
    const emailServiceId = process.env.emailJSServiceID
    const emailUserId = process.env.emailJSUserID

    if (!emailServiceId || !emailUserId) {
        alert('emailJS process variables not defined! Contact the admin.')
        return
    }

    const response = emailjs
        .send(emailServiceId, emailTemplateId, templateParams, emailUserId)

    return response;
}

export { validateEmail, sendEmail }