let direction = 'ltr';
if (typeof window !== 'undefined') {
  direction = document.getElementsByTagName('html')[0].getAttribute('dir');
}
const withDirection = Component => props => {
  return <Component {...props} data-rtl={direction} />;
};

export { direction, withDirection as WithDirection };
