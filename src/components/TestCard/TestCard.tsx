import React, { useState } from 'react';
import { IonCard, IonText, IonImg, IonButton, IonIcon, IonPopover, IonItem } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import './TestCard.scss';

interface TestCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onEdit: (event: React.MouseEvent) => void; // Función para editar
  onDelete: (event: React.MouseEvent) => void; // Función para eliminar
  onClick?: () => void; // Propiedad opcional para manejar clics en la tarjeta
}

const TestCard: React.FC<TestCardProps> = ({ title, description, imageUrl, onEdit, onDelete, onClick }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<React.MouseEvent | undefined>(undefined);

  const openPopover = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que la acción del popover propague el clic al contenedor padre
    setPopoverEvent(event);
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  return (
    <IonCard className="test-card" onClick={onClick}>
      <div className="test-card-content">
        <div className="test-card-image-section">
          <IonImg src={imageUrl} alt="Imagen del contenido" />
        </div>
        <div className="test-card-text-section">
          <IonText color="primary">
            <h2>{title}</h2>
          </IonText>
          <IonText color="medium">
            <p>{description}</p>
          </IonText>
        </div>
        <IonButton
          fill="clear"
          onClick={(e) => openPopover(e)} // Evitar propagación aquí también
          className="test-card-options-button"
        >
          <IonIcon icon={ellipsisVertical} />
        </IonButton>
        <IonPopover
          isOpen={showPopover}
          event={popoverEvent ? popoverEvent.nativeEvent : undefined}
          onDidDismiss={closePopover}
          alignment="center"
        >
          <IonItem button onClick={(e) => onEdit(e)}>Editar</IonItem>
          <IonItem button onClick={(e) => onDelete(e)}>Eliminar</IonItem>
        </IonPopover>
      </div>
    </IonCard>
  );
};

export default TestCard;

