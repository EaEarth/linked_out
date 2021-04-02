import ContactCard from './ContactCard';
import styles from '../../components/Chat/ChatList.module.scss';

export const ChatList: React.FC<any> = (contracts) => {
  const rows = [];
  for (let i = 0; i < Object.keys(contracts.chat).length; i++) {
    rows.push(
      <ContactCard
        key={i}
        {...Object.assign(
          { user: contracts.user },
          contracts.chat[i]
        )}></ContactCard>
    );
  }

  return <div className={`list-group ${styles.chatlist}`}>{rows}</div>;
};

export default ChatList;
