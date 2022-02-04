function getUnformattedFone(phone) {
  if (!phone) return '';

  phone = phone.replace(/[^\d]+/g, '');

  return phone;
}

export { getUnformattedFone };
