"use client"

import { ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import Paragraph, { ParagraphProps } from "@/components/UI/Typography/Paragraph";
import Row, { GridRowProps } from "../Grid/Row";
import Col, { GridColProps } from "../Grid/Col";
import useLayout from "../Layout/useLayout";
import utils from "@/utils";

export interface InfoRowProps extends GridRowProps {
  label?: ReactNode;
  text?: ReactNode;
  labelProps?: ParagraphProps;
  textProps?: ParagraphProps;
  labelSpanProps?: GridColProps;
  textSpanProps?: GridColProps;
  hasColon?: boolean;
}

const InfoRow: ForwardRefRenderFunction<HTMLDivElement, InfoRowProps> = (
  { label, text, labelProps, textProps, labelSpanProps, textSpanProps, hasColon = true, ...restProps },
  ref
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const themeClassName = `info-row-${theme}`;

  const labelSpanDefaultProps: GridColProps = { span: 6, ...labelSpanProps };

  const textSpanDefaultProps: GridColProps = { span: 16, ...textSpanProps };

  const labelDefaultProps: ParagraphProps = { rootClassName: "row-label", ...labelProps };

  const textDefaultProps: ParagraphProps = { strong: true, ...textProps };

  const mainClassName = utils.formatClassName("info-row", themeClassName);
  return (
    <Row ref={ref} rootClassName={mainClassName} {...restProps}>
      <Col {...labelSpanDefaultProps}>
        <Paragraph {...labelDefaultProps}>
          {label} {hasColon ? ":" : ""}
        </Paragraph>
      </Col>
      <Col {...textSpanDefaultProps}>
        <Paragraph {...textDefaultProps}>{text}</Paragraph>
      </Col>
    </Row>
  );
};

export default forwardRef(InfoRow);
