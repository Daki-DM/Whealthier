const getDietPlan = (data) => {
  return fetch('/api/getPlan', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
};

export {
  getDietPlan
};