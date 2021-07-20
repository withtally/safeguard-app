import { FC } from 'react';
import { Button, HStack } from '@chakra-ui/react';

// common
import FormInput from 'modules/common/components/FormInput';
import FormSelect from 'modules/common/components/FormSelect';
import { useWeb3 } from 'modules/common/hooks/useWeb3';

// admin
import { ROLES } from 'modules/admin/lib/constants';
import { useGrantRole } from 'modules/admin/hooks/useGrantRole';

const GrantRoleForm: FC = () => {
  // custom hooks
  const { openSelectWallet, isWeb3Ready } = useWeb3();
  const { handleChange, values, submitForm, formSubmitting, errors, touched } = useGrantRole();

  // handlers
  const handleSubmitForm = async (): Promise<void> => {
    if (isWeb3Ready) {
      await submitForm()
    } else {
      await openSelectWallet()
    }
  };

  return (
    <form id="grantRoleForm">
      <HStack spacing={4} mb={10} w="full">
        <HStack spacing={4} w="xl" align="center">
          <FormSelect
            id="role"
            name="role"
            label="Role"
            values={values}
            placeholder="Select role"
            onChange={handleChange}
            errors={errors}
            touched={touched}
            w={44}
            h="6.125rem"
          >
            {ROLES.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.label}
              </option>
            ))}
          </FormSelect>
          <FormInput
            name="address"
            id="address"
            label="Address"
            placeholder="Enter an ETH address"
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            h="6.125rem"
          />
        </HStack>
        <Button onClick={handleSubmitForm} size="md" variant="primary" isLoading={formSubmitting}>
          Grant role
        </Button>
      </HStack>
    </form>
  );
};

export default GrantRoleForm;
