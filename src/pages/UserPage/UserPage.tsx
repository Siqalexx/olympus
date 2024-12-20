import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ParticipantService from '../../services/ParticipantService';
import { IContest } from '../../models/IContest';
import UserPageContent from '../../components/User/UserPageContent/UserPageContent';
import './UserPage.scss';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
const UserPage: FC = () => {
    const { sessionId } = useParams<string>();
    const { store } = useContext(Context);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const history = useNavigate();
    useEffect(() => {
        async function getContest() {
            try {
                let response;
                if (sessionId) {
                    response = await ParticipantService.getContest<IContest>(
                        sessionId,
                    );
                    if (response?.data) {
                        store.setContest(response.data);
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.code === 'ERR_BAD_RESPONSE') {
                    await getContest();
                } else {
                    console.log(error);
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (!store.user.email && !store.user.name && !store.user.surname) {
            history('/add-personal-data');
        }
        getContest();
    }, [sessionId]);
    if (isLoading) {
        return <div>Ожидайте</div>;
    }
    return (
        <div className="userPage">
            <UserPageContent />
        </div>
    );
};

export default observer(UserPage);
