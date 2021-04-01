import ContactCard from './ContactCard';

export const ChatList: React.FC<any> = (contracts) => {
  const rows = [];
  console.log(contracts.length);
  for (let i = 0; i < contracts.length; i++) {
    rows.push(<ContactCard {...contracts[i]}></ContactCard>);
  }

  return <>{rows}</>;
};

export default ChatList;
