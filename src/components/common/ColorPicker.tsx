'use client';
import { WebsiteModel } from '@/types/WebsiteModel';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import styled from 'styled-components';

type ColorPreviewPros = {
	previewColor: string;
};

type Props = {
	title: string;
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	valueType: keyof WebsiteModel;
	webData: WebsiteModel;
};

const ColorPicker = (props: Props) => {
	const { title, valueType, update, webData } = props;
	const [showColorPicker, setShowColorPicker] = React.useState<boolean>(false);

	const handleColorChange = (color: ColorResult) => {
		update(valueType, color.hex);
	};

	return (
		<div>
			<h4>{title}</h4>
			<PreviewContainer
				previewColor={webData[valueType]}
				onClick={() => setShowColorPicker(!showColorPicker)}
			>
				<FontAwesomeIcon icon={faPalette} />
			</PreviewContainer>
			{showColorPicker && (
				<ColorPickerContainer>
					<SketchPicker
						onChange={handleColorChange}
						color={webData[valueType]}
					/>
				</ColorPickerContainer>
			)}
		</div>
	);
};

const ColorPickerContainer = styled.div`
	/* position: absolute; */
`;

const PreviewContainer = styled.div<ColorPreviewPros>`
	background-color: ${(props) => props.previewColor};
	border: 1px solid black;
	height: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;
export default ColorPicker;
