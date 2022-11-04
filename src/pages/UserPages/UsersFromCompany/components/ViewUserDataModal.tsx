import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '../../../../components/Forms/Input';
import { AiOutlineClose } from 'react-icons/ai';
import { useUsersList } from '../../../../hooks/useUsersList';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#222222',
  boxShadow: 24,
  p: 4,
  mx: 4,
};

export interface ViewUserDataModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

export default function ViewUserDataModal({
  handleClose,
  isOpen,
}: ViewUserDataModalProps) {
  const { currentUserData: user } = useUsersList();

  if (!user) {
    return (
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position="relative">
          Carregando...
        </Box>
      </Modal>
    );
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position="relative" maxWidth={'1280px'} width="100%">
          <Box display="flex" marginTop={2} gap={2}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Informações do usuário
            </Typography>
            <Box position="absolute" top="0" right="0">
              <Button sx={{ p: 1, display: 'block' }} onClick={handleClose}>
                <AiOutlineClose />
              </Button>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
            gap={4}
          >
            <Box marginTop={4} width="100%">
              <Input labelText="E-mail" defaultValue={user?.email} disabled />

              <Input labelText="Nome" defaultValue={user?.name} disabled />
              <Input labelText="Último nome" defaultValue={user?.lastname} disabled />
              <Input labelText="Username" defaultValue={user?.username} disabled />
            </Box>

            <Box marginTop={4} width="100%">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                marginTop={2}
              >
                Cargos
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                borderTop="1px solid #4f4f50"
                paddingTop={1}
              >
                {user.UserRole &&
                  user.UserRole.map(({ role }) => (
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      gap={1}
                      key={role.id}
                    >
                      <Typography>{role.role}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>

            <Box marginTop={4} width="100%">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                marginTop={2}
              >
                Empresas
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                borderTop="1px solid #4f4f50"
                paddingTop={1}
              >
                {user.Company &&
                  user.Company.map((company) => (
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      gap={1}
                      key={company.id}
                    >
                      <Typography>{company.name}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
