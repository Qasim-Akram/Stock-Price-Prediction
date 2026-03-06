function formatDate(date){
    const yyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyy}-${mm}-${dd}`
}

function getDateNDaysago(n){
     const now = new Date()
     now.setDate(now.getDate()-n)
     return formatDate(now)
}

export const dates = {
    startDate : getDateNDaysago(10),
    endDate : getDateNDaysago(1)
}