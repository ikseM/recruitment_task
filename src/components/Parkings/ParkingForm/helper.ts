export const TEXT_VALUES = {
  paid: "Płatny",
  notPaid: "Bezpłatny"
}


export const convertBooleanToText = (value: boolean) => {
  return value ? TEXT_VALUES.paid : TEXT_VALUES.notPaid
}

export const convertTextToBoolean = (value: string) => {
  return value === TEXT_VALUES.paid
}
