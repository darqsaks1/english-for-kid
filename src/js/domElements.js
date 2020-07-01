export default function renderWrapper() {
  const containerWrapper = document.createElement('div');
  containerWrapper.className = 'container-wrapper';
  document.body.append(containerWrapper);
}
